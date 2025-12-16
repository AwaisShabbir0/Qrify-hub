import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        // Only initialize if not already scanned
        if (scanResult) return;

        const scannerId = "qr-reader-widget";
        let scanner = null;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            try {
                if (document.getElementById(scannerId)) {
                    scanner = new Html5QrcodeScanner(
                        scannerId,
                        {
                            fps: 10,
                            qrbox: { width: 250, height: 250 },
                            aspectRatio: 1.0,
                            showTorchButtonIfSupported: true
                        },
                        /* verbose= */ false
                    );

                    scanner.render(
                        (decodedText) => {
                            // Success
                            setScanResult(decodedText);
                            scanner.clear().catch(console.warn);
                        },
                        (error) => {
                            // Ignore scan errors as they happen every frame
                        }
                    );
                }
            } catch (err) {
                console.error("Scanner init error:", err);
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (scanner) {
                scanner.clear().catch(console.warn);
            }
        };
    }, [scanResult]);

    const handleRetry = () => {
        setScanResult(null);
    };

    return (
        <div className="scanner-container">
            {!scanResult && <div id="qr-reader-widget"></div>}

            {scanResult && (
                <div className="result-box">
                    <h3>Scanned Result:</h3>
                    <p style={{ marginTop: '0.5rem', fontWeight: 'bold', wordBreak: 'break-all' }}>
                        {scanResult.startsWith('http') ? (
                            <a href={scanResult} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                {scanResult}
                            </a>
                        ) : (
                            scanResult
                        )}
                    </p>
                    <button className="btn" style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => {
                        navigator.clipboard.writeText(scanResult);
                        alert('Copied!');
                    }}>
                        Copy
                    </button>

                    <button
                        className="btn btn-secondary"
                        style={{ marginTop: '0.5rem', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={handleRetry}
                    >
                        Scan Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
