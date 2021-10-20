import './style.scss';

function Static2() {
  return (
    <div 
        className='static2'
        style={{ 
            backgroundPosition: 'center',
            backgroundImage: 'url("./images/img_third_section_bg.png")',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            
        }}
    >
        <p>Another powerful phrase here as a separation</p>
    </div>
  );
}

export default Static2;
