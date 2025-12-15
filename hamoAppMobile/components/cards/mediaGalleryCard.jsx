import ZoomableImage from "../mediaGallery/zoomableImage";
import VideoPlayer from "../mediaGallery/videoPlayer";


export default function MediaGalleryCard({ metaData }) {

    const CardComponent = () => {
        switch (metaData.type) {
            case "image":
                return <ZoomableImage metaData={metaData} />;
            case "video":
                return <VideoPlayer metaData={metaData} />;
            default:
                return;
        }
    }

    return (
        <CardComponent />
    );
}