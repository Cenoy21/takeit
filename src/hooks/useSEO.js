import { useEffect } from 'react';
import { updateMetaTags, injectStructuredData } from '../utils/seoHelper';

export const useSEO = ({
  title,
  description,
  keywords,
  ogImage,
  schema,
  schemaId = 'page-structured-data'
}) => {
  useEffect(() => {
    updateMetaTags({ title, description, keywords, ogImage });

    if (schema) {
      injectStructuredData(schemaId, schema);
    }

    return () => {
      if (schemaId) {
        const script = document.getElementById(schemaId);
        if (script) {
          script.remove();
        }
      }
    };
  }, [title, description, keywords, ogImage, schema, schemaId]);
};
