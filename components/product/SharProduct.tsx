import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";

interface ShareProductProps {
  facebookShare?: boolean;
  twitterShare?: boolean;
  whatsappShare?: boolean;
  showCopyLink?: boolean;
  shareText?: string;
  slug:string
}

const ShareProduct = ({
  facebookShare = true,
  twitterShare = true,
  whatsappShare = true,
  showCopyLink = true,
  slug,
  shareText = "Check out this product!",
}: ShareProductProps) => {
  // Safely get URL (works in SSR/SSG)
  const getShareUrl = () => {
    if (typeof window === "undefined") return ""; // Server-side fallback
    let link=window.location.origin+"/product/"+slug
    return link;
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  // Social share URLs
  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-1 text-gray-800">
      {facebookShare && (
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          aria-label="Share on Facebook"
        >
          <FaFacebookF className="w-4 h-4" />
        </a>
      )}

      {twitterShare && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
          aria-label="Share on Twitter"
        >
          <FaTwitter className="w-4 h-4" />
        </a>
      )}

      {whatsappShare && (
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
        </a>
      )}

      {showCopyLink && (
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Copy link"
        >
          <FaLink className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default ShareProduct;
