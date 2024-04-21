window.addEventListener('DOMContentLoaded',function(){

    var headerToggle= document.querySelector('.sp__header__toggle');
    var headerToggleClose = document.querySelector('.js__sp__header__close');
    var headerNav = document.querySelector('.sp__header__nav');
    var modal = document.querySelector('.sp__header__modal');
    
     //背景固定
     function backfaceFixed(fixed) {
        /**
         * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
         */
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;
        document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';

        /**
         * スクロール位置を取得する要素を出力する(`html`or`body`)
         */
        const scrollingElement = () => {
            const browser = window.navigator.userAgent.toLowerCase();
            if ('scrollingElement' in document) return document.scrollingElement;
            if (browser.indexOf('webkit') > 0) return document.body;
            return document.documentElement;
        };

        /**
         * 変数にスクロール量を格納
         */
        const scrollY = fixed
            ? scrollingElement().scrollTop
            : parseInt(document.body.style.top || '0');

        /**
         * CSSで背面を固定
         */
        const styles = {
            height: '100vh',
            left: '0',
            overflow: 'hidden',
            position: 'fixed',
            top: `${scrollY * -1}px`,
            width: '100vw',
        };

        Object.keys(styles).forEach((key) => {
            document.body.style[key] = fixed ? styles[key] : '';
        });

        /**
         * 背面固定解除時に元の位置にスクロールする
         */
        if (!fixed) window.scrollTo(0, scrollY * -1);
    };

//ハンバーガーメニューを開いたとき
    headerToggle.addEventListener('click',function(){
        this.classList.toggle('is-active');
        modal.classList.toggle('is-active');
        backfaceFixed(true);
    })
//ハンバーガーメニューを閉じたとき
    headerToggleClose.addEventListener('click',function(){
            headerToggle.classList.toggle('is-active');
            this.classList.toggle('is-active');
            modal.classList.toggle('is-active');
            backfaceFixed(false);
    })

    //swiper
    new Splide ('.splide',{
        arrows: false,
        pauseOnHover: false,
        type: 'loop',
        rewind: true,
        perPage: 3,
        pagination: false, // ページネーションを非表示
        // autoScroll: {
        //     speed: 1.5,
        //     pauseOnHover: false,
        //     pauseOnFocus: false,
        //   },
      })
    //   .mount(window.splide.Extensions);
      .mount();


 //フォーム
    const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://yamkei-test.site/Future/mail.php', true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) { // 4はリクエスト完了を意味します
                document.querySelector(".end__message").style.display = 'block';
                document.querySelector(".submit__btn").style.display = 'none';

                // 以下の行でフォームの入力をリセットします
                form.reset();
            }
        };

        xhr.send(formData);
    });
}
})
