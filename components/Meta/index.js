import Head from 'next/head';

const Meta = ({ title, description }) => (
  <Head>
    <title key="title">{title}</title>

    <meta
      key="description"
      name="description"
      content={description}
    />
    <meta property="og:type" content="website" />
    <meta
      key="og:title"
      name="og:title"
      content={title}
    />
    <meta
      key="og:description"
      name="og:description"
      content={description}
    />
    <meta
      key="og:url"
      name="og:url"
      content={'https://medicare.now.sh'}
    />
  </Head>
);

export default Meta;