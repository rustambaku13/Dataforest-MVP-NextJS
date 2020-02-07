import { useRouter } from 'next/router';

function TopHeader({ title }) {
  const Router = useRouter();

  const textStyle = {
    fontWeight: 600,
    fontSize: '1.4em',
    height: '100%',
    lineHeight: '45px',
    paddingLeft: '3rem',
    textTransform: 'uppercase'
  };

  return (
    <div className="top-header" style={{ height: 45 }}>
      <div style={{ height: '100%' }}>
        <h1 style={textStyle}>{title ? title : Router.pathname.slice(1).toUpperCase()}</h1>
      </div>
    </div>
  )
}

export default TopHeader;