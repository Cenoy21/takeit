export const updateMetaTags = ({
  title = 'takeit™ | Viral Innovations & Lifestyle Direct Store',
  description = 'Discover viral trending lifestyle gadgets, ergonomic essentials, and premium smart home innovations with free express worldwide shipping and 30-day money-back guarantee.',
  keywords = 'dropshipping, viral gadgets, smart home, trending products, ergonomics, lifestyle essentials',
  ogImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
  url = window.location.href,
}) => {
  document.title = title;

  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  setMeta('description', description);
  setMeta('keywords', keywords);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:image', ogImage, true);
  setMeta('og:url', url, true);
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', ogImage);
};

export const injectStructuredData = (schemaId, schemaObject) => {
  let script = document.getElementById(schemaId);
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
};
