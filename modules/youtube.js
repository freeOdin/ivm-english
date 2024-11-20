export function createYouTubeEmbed(videoId) {
    if (!videoId) return document.createElement('div'); // Return empty div if no video ID
    
    const embedContainer = document.createElement('div');
    embedContainer.className = 'youtube-embed';
    
    const iframe = document.createElement('iframe');
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    embedContainer.appendChild(iframe);
    return embedContainer;
}
