(() => {
    
    let yOffset = 0; //스크롤 시 현재 위치 저장 변수
    let prevScrollHeight = 0 //현재 yOffset보다 이전에 위치한 섹션 scrollHeight
    let currentScene = 0 //현재 활성화된 scroll-section

    const sceneInfo = [
        {
            // scroll-section-0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            } 
        },
        {
            // scroll-section-1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            } 
        },
        {
            // scroll-section-2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            } 
        },
        {
            // scroll-section-3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            } 
        }
    ];

    function setLayout () {
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length ; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; 
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0; 
        for(let i = 0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    
    function scrollLoop() {
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene ; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('resize',setLayout);
    window.addEventListener('load', setLayout);

    setLayout();
})();