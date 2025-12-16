import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator = () => {
    const [text, setText] = useState('https://example.com');
    const qrRef = useRef();

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="generator-container">
            <div className="input-group">
                <label htmlFor="qr-text">Enter text or URL</label>
                <input
                    id="qr-text"
                    type="text"
                    placeholder="Type something..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <div className="qr-display" ref={qrRef}>
                {text && (
                    <>
                        <QRCodeCanvas
                            value={text}
                            size={256}
                            level={"H"}
                            includeMargin={true}
                            imageSettings={{
                                src: "/vite.svg", // Optional logo, using vite logo for now if available, or remove
                                x: undefined,
                                y: undefined,
                                height: 24,
                                width: 24,
                                excavate: true,
                            }}
                        />
                        <p className="qr-text-preview" style={{ wordBreak: 'break-all', fontSize: '0.8rem', color: '#666' }}>
                            {text.length > 50 ? text.substring(0, 50) + '...' : text}
                        </p>
                    </>
                )}
            </div>

            {text && (
                <button className="btn" onClick={handleDownload} style={{ marginTop: '1.5rem' }}>
                    Download PNG
                </button>
            )}
        </div>
    );
};

export default QRGenerator;
