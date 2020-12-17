<template>
    <div class="main-body">
        <!-- Castom elements -->
        <template>
            <div class="lines">
                <b-row>
                    <b-col v-for="i in 3" :key="'line' + i"></b-col>
                </b-row>
            </div>
            <div
                class="fixed-top rellax"
                data-rellax-speed="-2"
                style="transform: translate3d(0px, 0px, 0px) rotate(45deg);"
            ></div>
            <template v-for="(figure, index) in figures">
                <div
                    class="random-figure rellax"
                    :data-rellax-speed="figure.speed"
                    style="transform: translate3d(0px, -61px, 0px) rotate(45deg);"
                    :style="figure.style"
                    :key="'figure' + index"
                ></div>
            </template>
            <template>
                <!--
                    <div>
                    <div class="rellax country country-1" data-rellax-speed="2">
                        Russia
                    </div>
                    <div class="rellax country country-2" data-rellax-speed="2">
                        Usa
                    </div>
                    <div class="rellax country country-3" data-rellax-speed="2">
                        UK
                    </div>
                    <svg id="svg-line">
                        <template v-for="(lineData, index) in lines">
                            <line
                                :key="'line' + index"
                                x1="0"
                                y1="0"
                                x2="100"
                                y2="0"
                                stroke-width="1"
                                stroke="gray"
                                class="rellax line"
                                :class="
                                    `line-${lineData.n1.value}-${lineData.n2.value}`
                                "
                                data-rellax-speed="2"
                            />
                        </template>
                    </svg>
                </div>
                -->
            </template>
        </template>
        <div class="header-container">
            <b-row class="header">
                <b-col cols="5"
                    ><a
                        href="https://github.com/languages-learner/site"
                        target="_blank"
                        >github</a
                    ></b-col
                >
                <div class="github-underline"></div>
            </b-row>
            <b-row class="name">
                <b-col md="5" cols="12" class="title"
                    ><h1>
                        Languages <br />
                        Learner
                    </h1></b-col
                >
                <b-col md="6" cols="12" class="d-flex justify-content-end"
                    ><n-link
                        tag="div"
                        :to="localePath('/login/')"
                        class="nav-item"
                    >
                        <b-button class="mr-2"> sign in</b-button> </n-link
                    ><n-link
                        tag="div"
                        :to="localePath('/signup/')"
                        class="nav-item"
                    >
                        <b-button> sign up</b-button>
                    </n-link></b-col
                >
            </b-row>
            <b-row class="w-50 features d-block d-md-flex">
                <b-col>Dictionary</b-col>
                <b-col class="text-md-center mt-md-0 mt-2">Texts</b-col>
                <b-col class="text-md-center mt-md-0 mt-2">Rules</b-col>
            </b-row>
        </div>

        <!-- Features -->
        <div class="features-container">
            <div class="feature-container">
                <b-row class="h-100">
                    <b-col
                        cols="4"
                        class="d-flex align-items-center justify-content-center"
                        ><img src="http://clipart-library.com/img/1424798.png"
                    /></b-col>
                    <b-col cols="8"
                        ><div class="text-center"><b>Dictionary</b></div>
                        <div class="mt-2 text-center">text</div></b-col
                    >
                </b-row>
                <div class="top-left"></div>
                <div class="bottom-right"></div>
            </div>
            <div class="feature-container mt-4">
                <b-row class="h-100">
                    <b-col
                        cols="4"
                        class="d-flex align-items-center justify-content-center"
                        ><img src="http://clipart-library.com/img/1424798.png"
                    /></b-col>
                    <b-col cols="8"
                        ><div class="text-center"><b>Texts</b></div>
                        <div class="mt-2 text-center">text</div></b-col
                    >
                </b-row>
                <div class="top-left"></div>
                <div class="bottom-right"></div>
            </div>
            <div class="feature-container mt-4">
                <b-row class="h-100">
                    <b-col
                        cols="4"
                        class="d-flex align-items-center justify-content-center"
                        ><img src="http://clipart-library.com/img/1424798.png"
                    /></b-col>
                    <b-col cols="8"
                        ><div class="text-center"><b>Rules</b></div>
                        <div class="mt-2 text-center">text</div></b-col
                    >
                </b-row>
                <div class="top-left"></div>
                <div class="bottom-right"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Rellax from 'rellax'
export default {
    data() {
        return {
            figuresSettings: {
                count: 5,
                size: {
                    min: 40,
                    max: 150
                },
                colors: ['#5000f1', '#00f1c9'],
                xPadding: 100,
                yPadding: 600,
                speed: {
                    min: -6,
                    max: 7
                }
            },
            figures: [],
            lines: [
                {
                    n1: { value: 1, offset: [35, 25] },
                    n2: { value: 2, offset: [0, 0] }
                },
                {
                    n1: { value: 2, offset: [25, 0] },
                    n2: { value: 3, offset: [-10, 15] }
                },
                {
                    n1: { value: 3, offset: [0, 0] },
                    n2: { value: 1, offset: [50, 10] }
                }
            ]
        }
    },
    mounted() {
        var rellax = new Rellax('.rellax')
        //this.createFigures()
        //window.addEventListener('resize', this.createLines, false)
        //this.createLines()
    },
    methods: {
        createFigures() {
            console.log(document.body.clientHeight, document)
            for (var i = 0; i < this.figuresSettings.count; i++) {
                var size =
                    String(
                        this.randomFloat(
                            this.figuresSettings.size.min,
                            this.figuresSettings.size.max
                        )
                    ) + 'px'
                this.figures.push({
                    style: {
                        width: size,
                        height: size,
                        background: this.figuresSettings.colors[
                            this.randomInt(
                                0,
                                this.figuresSettings.colors.length - 1
                            )
                        ],
                        left:
                            String(
                                this.randomFloat(
                                    this.figuresSettings.xPadding,
                                    document.body.clientWidth -
                                        this.figuresSettings.xPadding
                                )
                            ) + 'px',
                        top:
                            String(
                                this.randomFloat(
                                    this.figuresSettings.yPadding,
                                    document.body.clientHeight -
                                        this.figuresSettings.yPadding
                                )
                            ) + 'px'
                    },
                    speed: this.randomInt(
                        this.figuresSettings.speed.min,
                        this.figuresSettings.speed.max
                    )
                })
            }
            console.log(this.figures)
        },
        createLines() {
            var createLine = (n1, n1Offset, n2, n2Offset) => {
                console.log(n1, n2)
                var item1Coords = this.getCoords(
                    document.getElementsByClassName(`country-${n1}`)[0]
                )
                var item2Coords = this.getCoords(
                    document.getElementsByClassName(`country-${n2}`)[0]
                )

                var svg = document.getElementById('svg-line')
                var line12 = svg.querySelector(`.line-${n1}-${n2}`)
                console.log(line12, 'line12')
                line12.setAttribute('x1', item1Coords.left + n1Offset[0])
                line12.setAttribute('y1', item1Coords.top + n1Offset[1])
                line12.setAttribute('x2', item2Coords.left + n2Offset[0])
                line12.setAttribute('y2', item2Coords.top + n2Offset[1])
            }

            for (var line in this.lines) {
                line = this.lines[line]
                createLine(
                    line.n1.value,
                    line.n1.offset,
                    line.n2.value,
                    line.n2.offset
                )
            }
        },
        getCoords(elem) {
            var box = elem.getBoundingClientRect()

            var body = document.body
            var docEl = document.documentElement

            // (2)
            var scrollTop =
                window.pageYOffset || docEl.scrollTop || body.scrollTop
            var scrollLeft =
                window.pageXOffset || docEl.scrollLeft || body.scrollLeft

            // (3)
            var clientTop = docEl.clientTop || body.clientTop || 0
            var clientLeft = docEl.clientLeft || body.clientLeft || 0

            // (4)
            var top = box.top + scrollTop - clientTop
            var left = box.left + scrollLeft - clientLeft

            return {
                top: top,
                left: left
            }
        },
        randomInt(min, max) {
            return min + Math.floor((max - min) * Math.random())
        },
        randomFloat(min, max) {
            return min + (max - min) * Math.random()
        }
    }
}
</script>

<!-- Castom elements -->
<style lang="less">
.lines {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-right: 40px;
    .row {
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        > div {
            border-left: 1px rgba(204, 204, 204, 0.521) solid;
        }
        > div:last-child {
            border-right: 1px rgba(204, 204, 204, 0.521) solid;
        }
    }
}

.fixed-top {
    position: absolute;
    width: 600px;
    max-width: 80vw;
    height: 600px;
    max-height: 80vw;
    background: #00d5f1;
    border-radius: 12px;
    z-index: -1;
    margin-top: -220px;
    margin-left: 100px;

    @media screen and (max-width: 500px) {
        margin-top: 0px;
    }
}

.random-figure {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #5000f1;
    border-radius: 12px;
}

.country {
    position: absolute;
    &.country-1 {
        top: 700px;
        left: 30%;
    }
    &.country-2 {
        top: 900px;
        left: 60%;
    }
    &.country-3 {
        top: 800px;
        left: 80%;
    }
}

.yellow {
    position: relative;
    z-index: 100;
}

#svg-line {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}
</style>

<style lang="less">
.main-body {
    position: relative;
    min-height: 100vh;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 50px;
}

.header-container {
    height: 100vh;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    .header {
        padding-top: 50px;
        text-transform: uppercase;
        font-weight: bold;
        position: relative;

        a {
            color: black !important;
        }

        :hover {
            cursor: pointer;
            text-decoration: underline;
            color: black;
        }
    }
    .name {
        margin-top: 100px;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        font-weight: bold;

        .title {
            font-size: 4rem !important;
        }
    }
    .features {
        margin-top: 30px;
        font-weight: bold;
        font-size: 1.3rem !important;
    }
}
.content-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    border: 1px black solid;
}
.features-container {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    position: relative;

    .feature-container {
        height: 250px;
        background: rgba(#1b96a7, 0.521);
        padding-top: 30px;
        border-radius: 5px;
        position: relative;

        img {
            max-width: 100%;
            max-width: 150px;
            transform: none !important;
        }
    }

    .border-element {
        position: absolute;
        width: 70px;
        height: 70px;

        border-color: black;
        border-style: solid;
    }
    .top-left {
        top: 0;
        left: 0;

        border-top: 3px;
        border-left: 3px;
        border-right: 0;
        border-bottom: 0;
        border-radius: 5px 0 0 0;
        .border-element;
    }
    .bottom-right {
        bottom: 0;
        right: 0;

        border-top: 0;
        border-left: 0;
        border-right: 3px;
        border-bottom: 3px;
        border-radius: 0 0 5px 0;
        .border-element;
    }
}
.dictioary-container {
    img {
        max-width: 100%;
        max-width: 150px;
        transform: none !important;
    }
}
.github-underline {
    position: absolute;
    bottom: -10px;
    left: 15px;
    width: 30px;
    height: 6px;
    background: white;
}
</style>
