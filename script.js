let video = document.getElementById("video");
let model;
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");


const setupCamera = () => {
    navigator.mediaDevices.getUserMedia({
        video: { width: 1200, height: 800 },
        audio: false,
    }).then((stream) => {
        video.srcObject = stream;
    });
};

const detectFaces = async () => {
    const prediction=await model.estimateFaces(video,false);
    console.log(prediction);

    ctx.drawImage(video,0,0,1200,800);

    prediction.forEach(pred => {
        ctx.beginPath();
        ctx.lineWidth="4";
        ctx.strokeStyle="red";

        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0]-pred.topLeft[0],
            pred.bottomRight[1]-pred.topLeft[1]
        );
        ctx.stroke();
    });
}


setupCamera();
video.addEventListener("loadeddata", async () => {
    model =await blazeface.load();
    setInterval(detectFaces,100);
    
})

