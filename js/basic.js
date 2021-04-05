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
                canvas_opacity: [1, 0, { start: 0.9, end: 1 }]
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
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }]
            }
        },
        {
            // scroll-section-3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagePath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: []
            },
            values: {
                rect1: [0, 0, { start: 0, end: 0 }],
                rect2: [0, 0, { start: 0, end: 0 }],
                rectStartY: 0,

                blendHeight: [0, 0, { start: 0, end: 0 }],
                canvas_scale: [0, 0, { start: 0, end: 0 }]
            }
        }
    ];

    function setCanvasImage() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagePath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagePath[i];
            sceneInfo[3].objs.images.push(imgElem3);
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

                if (scrollRatio <= 0.5) {
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

                //세번째 씬 캔버스 미리 그리기(스크롤 시 부드럽게 넘어가기 위해)
                if (scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;

                    if (widthRatio <= heightRatio) {
                        // 캔버스보다 브라우저의 가로 길이가 작은 경우
                        canvasScaleRatio = heightRatio;
                    } else {
                        // 캔버스보다 브라우저의 세로 길이가 작은 경우
                        canvasScaleRatio = widthRatio;
                    }

                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.drawImage(objs.images[0], 0, 0);
                    objs.context.fillStyle = 'white';

                    // 흰색 사각형 그리기
                    // 설정된 canvasScaleRatio에 맞춰 다시 innerWidth, innerHeight 구해야함
                    const ratio_width = document.body.offsetWidth / canvasScaleRatio;
                    const rectWidth = ratio_width * 0.15;

                    values.rect1[0] = (objs.canvas.width - ratio_width) / 2; //출발값
                    values.rect1[1] = values.rect1[0] - rectWidth;           //최종값
                    values.rect2[0] = values.rect1[0] + ratio_width - rectWidth;
                    values.rect2[1] = values.rect2[0] + rectWidth;

                    objs.context.fillRect(
                        parseInt(values.rect1[0]),
                        0,
                        parseInt(rectWidth),
                        objs.canvas.height
                    );
                    objs.context.fillRect(
                        parseInt(values.rect2[0]),
                        0,
                        parseInt(rectWidth),
                        objs.canvas.height
                    );
                }

                break;

            case 3:
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저의 가로 길이가 작은 경우
                    canvasScaleRatio = heightRatio;
                } else {
                    // 캔버스보다 브라우저의 세로 길이가 작은 경우
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.drawImage(objs.images[0], 0, 0);
                objs.context.fillStyle = 'white';

                // 흰색 사각형 그리기
                // 설정된 canvasScaleRatio에 맞춰 다시 innerWidth, innerHeight 구해야함
                const ratio_width = document.body.offsetWidth / canvasScaleRatio;
                const rectWidth = ratio_width * 0.15;

                values.rect1[0] = (objs.canvas.width - ratio_width) / 2; //출발값
                values.rect1[1] = values.rect1[0] - rectWidth;           //최종값
                values.rect2[0] = values.rect1[0] + ratio_width - rectWidth;
                values.rect2[1] = values.rect2[0] + rectWidth;

                if (!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    // 캔버스 드로우 애니메이션 1, 2 참조
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    values.rect1[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1[2].end = values.rectStartY / scrollHeight;
                    values.rect2[2].end = values.rectStartY / scrollHeight;
                }

                objs.context.fillRect(
                    parseInt(calcValues(values.rect1, currentYOffset)),
                    0,
                    parseInt(rectWidth),
                    objs.canvas.height
                );
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2, currentYOffset)),
                    0,
                    parseInt(rectWidth),
                    objs.canvas.height
                );

                if (scrollRatio < values.rect1[2].end) { // 캔버스가 브라우저 상단에 닿지 않았을 때
                    objs.canvas.classList.remove('sticky');

                } else { // 캔버스가 브라우저 상단에 닿았을 때(이미지 블렌딩 처리)
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1[2].end;
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                    const blendHeight = calcValues(values.blendHeight, currentYOffset);


                    objs.context.drawImage(
                        objs.images[1],
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                        0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                    );

                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                    if (scrollRatio > values.blendHeight[2].end) { //이미지가 블렌딩된 후 스케일 조정
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;
                    }

                    if(scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0){ //스케일 조정 후 
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
                    }
                }

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