import ZoomableImage from "../mediaGallery/zoomableImage";
import VideoPlayer from "../mediaGallery/videoPlayer";


export default function MediaGalleryCard({ metaData }) {

    const CardComponent = () => {
        console.log(metaData);
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