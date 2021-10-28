import TopNav from '../TopNav/TopNav';
import SideNav from '../SideNav/SideNav';
import './style.scss';

function RequestsPage(props) {

    return (
        <div>
            <TopNav />
            <main>
                <SideNav />

                <div id='requests-wrap'>
                    Requests
                </div>
            </main>
        </div>
    );
}

export default RequestsPage;



