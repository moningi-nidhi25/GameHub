import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords }) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title - Format: "Title | GameHub" or just "GameHub" for home
        const baseTitle = "GameHub";
        const suffix = "Cosmic Edition";
        document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | ${suffix}`;

        // Update Meta Description
        if (description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = "description";
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', description);

            // Update OG and Twitter Descriptions
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', description);

            const twitterDesc = document.querySelector('meta[property="twitter:description"]');
            if (twitterDesc) twitterDesc.setAttribute('content', description);
        }

        // Update Meta Keywords
        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = "keywords";
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', typeof keywords === 'array' ? keywords.join(', ') : keywords);
        }

        // Update OG URL
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    }, [title, description, keywords, location]);

    return null; // This component doesn't render anything
};

export default SEO;
