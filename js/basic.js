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
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],

                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],

                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],

                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],

                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas_opacity: [1, 0, {start: 0.9, end: 1}]
            }
        },
        {
            // scroll-section-1
            type: 'normal',
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
                content: document.querySelector('#scroll-section-1 .description')
            }
        },
        {
            // scroll-section-2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: []
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],

                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],

                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],

                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],

                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas_opacity_in: [0, 1, {start: 0, end: 0.1}],
                canvas_opacity_out: [1, 0, {start: 0.95, end: 1}]
            }
        },
        {
            // scroll-section-3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption')
            },
            values: {

            }
        }
    ];

    function setCanvasImage() {
        let imgElem;
        for(let i = 0; i< sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for(let i = 0; i< sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

    }
    setCanvasImage();

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }
            else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }

        document.body.setAttribute('id', `show-scene-${currentScene}`);

        //캔버스 크기 설정
        const heightRatio = window.innerHeight / 1080;
        // 창에 맞추기 위해서 css에서 50%씩 밀어놓고 여기서 원상복구함. 가운데정렬
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

    }

    function calcValues(values, currentYOffset) {
        let result;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행 (부분 영역 애니메이션)
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                result = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if (currentYOffset < partScrollStart) { result = values[0]; }
            else if (currentYOffset > partScrollEnd) { result = values[1]; }
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
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                if (scrollRatio <= 0.22) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                }
                else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.42) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_in, currentYOffset)}%)`;
                }
                else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.62) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_in, currentYOffset)}%)`;
                }
                else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out, currentYOffset)}%)`;
                }

                if (scrollRatio <= 0.82) {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_in, currentYOffset)}%)`;
                }
                else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_out, currentYOffset)}%)`;
                }

                break;

            case 2:
                let sequence_2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence_2], 0, 0);

                if(scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);   
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }


                if (scrollRatio <= 0.32) {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
                else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.93) {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
                break;

            case 3:
                break;
        }
    }

    function scrollLoop() {
        changeScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            changeScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return;
            changeScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (changeScene) return; //씬이 바뀔 때 이상한 값이 들어가는 것 방지

        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });

    setLayout();
})();