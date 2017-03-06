import style from "./style.css";
import {vertexData,fragmentData} from "./data";

var wl = document.querySelector("#webgl");
    var ctx = wl.getContext("webgl");

    //顶点着色器描述一个顶点的大小，位置；片元着色器 描述一个点的颜色

    //顶点着色器
    var vertexShaderSource = vertexData;
    //片元着色器
    var fragmentShaderSource = fragmentData;

    //创建顶点着色器
    var vertexShader = ctx.createShader(ctx.VERTEX_SHADER);
    //创建片元着色器
    var fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER);

    //把source导入着色器
    ctx.shaderSource(vertexShader,vertexShaderSource);
    ctx.shaderSource(fragmentShader,fragmentShaderSource);

    //对着色器对象进行编译
    ctx.compileShader(vertexShader);
    ctx.compileShader(fragmentShader);

    //webgl分两个运行部分：一个是javascript环境，另一个是webgl内部硬件运行部分，着色器代码运行在内部 program
    var program = ctx.createProgram();
    //把着色器附着在program上
    ctx.attachShader(program,vertexShader);
    ctx.attachShader(program,fragmentShader);

    //连接program
    ctx.linkProgram(program);
    ctx.useProgram(program);

    //设置背景色
    ctx.clearColor(0,0,1,1);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    //绘制
    ctx.drawArrays(ctx.POINTS,0,1);