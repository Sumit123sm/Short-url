
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setShortUrl("");
    setQrCode("");

    try {
      const res = await axios.post(
        "https://frontend-url-shorten.onrender.com//api/short",
        { originalUrl }
      );

      setShortUrl(res.data.shortUrl);
      setQrCode(res.data.qrCodeImg);
      setOriginalUrl("");

    } catch (err) {
      setError("Failed to shorten URL");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          URL Shortener
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <input
            type="url"
            placeholder="Enter your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-md py-3 font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Shorten"}
          </button>

        </form>

        {/* Result */}
        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-100 rounded text-center space-y-3">

            <p className="text-sm text-gray-600">Short URL:</p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold underline break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyToClipboard}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Copy Link
            </button>

            {/* QR Code */}
            {qrCode && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">QR Code:</p>
                <img src={qrCode} alt="QR Code" className="mx-auto w-40 h-40" />
              </div>
            )}

          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

      </div>
    </div>
  );
}