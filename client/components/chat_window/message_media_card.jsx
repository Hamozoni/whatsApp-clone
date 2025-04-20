"use client"
import Image from "next/image";
import Audio_player from "../ui/audio_player";
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

import { useEffect, useState } from "react";

const Message_media_card = ({file})=> {

    const [num_pages, set_num_pages] = useState(null);
    const [page_number, set_page_number] = useState(1);
    const [pdfUrl, setPdfUrl] = useState(null);

    function onDocumentLoadSuccess({ num_pages }) {
        set_num_pages(num_pages);
      };



      const fetchPdfBlob = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        return await response.blob(); // Get the PDF as a blob
      };

      useEffect(() => {
        const loadPdf = async () => {
          try {
            const blob = await fetchPdfBlob(file?.url);
            const blobUrl = URL.createObjectURL(blob); // Create a blob URL

            console.log(typeof blob)
            console.log(typeof blobUrl)
            setPdfUrl(blobUrl);
          } catch (error) {
            console.error('Error loading PDF:', error);
          }
        };
    
        loadPdf();
    
        // Cleanup blob URL on unmount
        return () => {
          if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
      }, []);

    return (
        <div className="">
            {
                file?.type === 'AUDIO' ?
                <Audio_player audio_url={file?.url} />:
                file?.type === 'IMAGE' ?
                <Image width={200} height={200} src={file?.url} alt='audio message' /> :
                file?.type === 'VIDEO' ? 
                <video width={200} height={200} src={file?.url} controls />:
                <div>
                    <Document file={`${pdfUrl}.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={page_number} />
                    </Document>
                    <p>
                    Page {page_number} of {num_pages}
                    </p>
              </div>
            }
        </div>
    );
};

export default Message_media_card;