import { useEffect, useId, useRef, useState } from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'

const BARCODE_FORMATS = [
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.QR_CODE,
]

/** 'idle' | 'starting' | 'scanning' | 'found' | 'error' */
export default function BarcodeScanner({ onDetected }) {
  const regionId = `scanner-region-${useId().replace(/:/g, '')}`
  const scannerRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastCode, setLastCode] = useState('')

  const stopScanner = async () => {
    const instance = scannerRef.current
    if (instance) {
      try {
        if (instance.isScanning) await instance.stop()
        instance.clear()
      } catch {
        // camera already torn down
      }
    }
    scannerRef.current = null
  }

  useEffect(() => stopScanner, [])

  const startScanner = async () => {
    setErrorMessage('')
    setStatus('starting')
    try {
      const html5Qrcode = new Html5Qrcode(regionId, {
        formatsToSupport: BARCODE_FORMATS,
        verbose: false,
      })
      scannerRef.current = html5Qrcode

      await html5Qrcode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 160 } },
        (decodedText) => {
          setLastCode(decodedText)
          setStatus('found')
          onDetected?.(decodedText)
          stopScanner()
        },
        () => {
          // per-frame "not found" noise — ignore
        },
      )
      setStatus('scanning')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err?.message?.includes('Permission')
          ? 'Camera access was denied. Grant permission and try again.'
          : 'Could not reach the webcam. Is another app using it?',
      )
    }
  }

  const scanAnother = async () => {
    await stopScanner()
    setStatus('idle')
    setLastCode('')
  }

  return (
    <div className="rounded-lg border border-amber-900/40 bg-zinc-900 p-6 shadow-xl shadow-black/40">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl tracking-wide text-amber-100">Bottle Scanner</h3>
        <span className="font-serif text-[11px] tracking-widest text-stone-500 uppercase">
          Optical Reader
        </span>
      </div>
      <div className="brass-rule my-3" />

      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-stone-800 bg-black">
        <div id={regionId} className="h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover" />

        {status !== 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-950/90 px-4 text-center">
            {status === 'idle' && (
              <>
                <span className="text-3xl">🥃</span>
                <p className="font-serif text-sm text-stone-300">
                  Hold a bottle's barcode up to the camera to log it automatically.
                </p>
                <button
                  type="button"
                  onClick={startScanner}
                  className="mt-1 rounded border border-amber-700/60 bg-amber-900/20 px-4 py-2 font-serif text-sm text-amber-200 transition hover:border-amber-500 hover:bg-amber-900/40"
                >
                  Activate Camera
                </button>
              </>
            )}
            {status === 'starting' && (
              <p className="font-serif text-sm text-amber-200 italic">Waking the lens…</p>
            )}
            {status === 'found' && (
              <>
                <span className="text-3xl">✓</span>
                <p className="font-serif text-sm text-amber-200">
                  Barcode captured: <span className="text-amber-400">{lastCode}</span>
                </p>
                <button
                  type="button"
                  onClick={scanAnother}
                  className="mt-1 rounded border border-amber-700/60 bg-amber-900/20 px-4 py-2 font-serif text-sm text-amber-200 transition hover:border-amber-500 hover:bg-amber-900/40"
                >
                  Scan Another Bottle
                </button>
              </>
            )}
            {status === 'error' && (
              <>
                <span className="text-3xl text-red-500">⚠</span>
                <p className="font-serif text-sm text-red-300">{errorMessage}</p>
                <button
                  type="button"
                  onClick={startScanner}
                  className="mt-1 rounded border border-amber-700/60 bg-amber-900/20 px-4 py-2 font-serif text-sm text-amber-200 transition hover:border-amber-500 hover:bg-amber-900/40"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}

        {status === 'scanning' && (
          <>
            <div className="pointer-events-none absolute inset-8 rounded-md border-2 border-amber-500/70">
              <span className="scan-line absolute left-0 right-0 h-px bg-amber-400 shadow-[0_0_8px_2px_rgba(217,119,6,0.7)]" />
              <span className="absolute -left-0.5 -top-0.5 h-4 w-4 border-l-2 border-t-2 border-amber-400" />
              <span className="absolute -right-0.5 -top-0.5 h-4 w-4 border-r-2 border-t-2 border-amber-400" />
              <span className="absolute -bottom-0.5 -left-0.5 h-4 w-4 border-b-2 border-l-2 border-amber-400" />
              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 border-b-2 border-r-2 border-amber-400" />
            </div>
            <button
              type="button"
              onClick={scanAnother}
              className="absolute bottom-2 right-2 rounded border border-stone-700 bg-stone-950/80 px-2 py-1 font-serif text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200"
            >
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  )
}
