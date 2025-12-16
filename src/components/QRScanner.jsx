import { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef(null);

    // Initialize scanner instance once
    useEffect(() => {
        scannerRef.current = new Html5Qrcode("reader");

        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(err => console.error("Failed to stop scanner on unmount", err));
            }
        };
    }, []);

    const startScanning = async () => {
        setScanResult(null);
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        try {
            await scannerRef.current.start(
                { facingMode: "environment" }, // Prefer back camera
                config,
                (decodedText, decodedResult) => {
                    // Success callback
                    setScanResult(decodedText);
                    stopScanning();
                },
                (errorMessage) => {
                    // Error callback (scanning in progress)
                    // console.log(errorMessage);
                }
            );
            setIsScanning(true);
        } catch (err) {
            console.error("Error starting scanner", err);
            alert("Could not start camera. Ensure you gave permissions and are using HTTPS.");
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current && isScanning) {
            try {
                await scannerRef.current.stop();
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanner", err);
            }
        }
    };

    return (
        <div className="scanner-container">
            <div id="reader">
                {!isScanning && !scanResult && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'white',
                        background: '#000'
                    }}>
                        <p style={{ opacity: 0.7 }}>Camera is off</p>
                    </div>
                )}
            </div>

            {/* Custom Control Buttons */}
            {!isScanning && (
                <button className="btn" onClick={startScanning}>
                    Start Scanning
                </button>
            )}

            {isScanning && (
                <button className="btn btn-delete" onClick={stopScanning}>
                    Stop Scanning
                </button>
            )}

            {scanResult && (
                <div className="result-box">
                    <h3>Scanned Result:</h3>
                    <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
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
                        onClick={() => {
                            setScanResult(null);
                            startScanning();
                        }}
                    >
                        Scan Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
