(() => {
    
    let yOffset = 0; //스크롤 시 현재 위치 저장 변수
    let prevScrollHeight = 0 //현재 yOffset보다 이전에 위치한 섹션 scrollHeight
    let currentScene = 0 //현재 활성화된 scroll-section
    let changeScene = false; //scene 변화 여부를 저장하는 변수

    const sceneInfo = [
        {
            // scroll-section-0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3}],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2}],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3}],

                messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }]
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
            if(sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } 
            else if(sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
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

    function calcValues(values, currentYOffset) {
        let result;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3) {
            // start ~ end 사이에 애니메이션 실행 (부분 영역 애니메이션)
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <=partScrollEnd){
                result = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if(currentYOffset < partScrollStart){ result = values[0]; }
            else if(currentYOffset > partScrollEnd) { result = values[1]; }
            

        } 
        else {
            //현재 씬 전체에서의 애니메이션
            result = scrollRatio * (values[1] - values[0]) + values[0];   
        }
        
        return result;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                let point = (values.messageA_opacity_out[2].start + values.messageA_opacity_in[2].end) / 2

                if( scrollRatio <= point){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                }
                else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }


                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    
    function scrollLoop() {
        changeScene = false;
        prevScrollHeight = 0;

        for(let i = 0; i < currentScene ; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            changeScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(yOffset < prevScrollHeight) {
            if(currentScene === 0) return;
            changeScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(changeScene) return; //씬이 바뀔 때 이상한 값이 들어가는 것 방지

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('resize',setLayout);
    window.addEventListener('load', setLayout);

    setLayout();
})();