import './style.scss';

function Static1() {
  return (
    <div 
        className='static1'
        style={{ 
            backgroundPosition: 'center',
            backgroundImage: 'url("./images/img_first_section_bg@2x.png")',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover', 
              
        }}
    >
        <p>Another powerful phrase here as a separation</p>
    </div>
  );
}

export default Static1;
