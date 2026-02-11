export default function detectMediaType(url: string): "image" | "video" | "gif" | "unknown" {
    const imageExtensions: string[] = ["jpg", "jpeg", "png", "bmp", "webp", "svg"];
    const videoExtensions: string[] = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"];
    const gifExtensions: string[] = ["gif"];

    // Extract file extension from URL
    const extension: string = url.split('.').pop()?.toLowerCase().split('?')[0] || "";


    if (imageExtensions.includes(extension)) {
        return "image";
    } else if (videoExtensions.includes(extension)) {
        return "video";
    } else if (gifExtensions.includes(extension)) {
        return "gif";
    } else {
        return "unknown";
    }
}