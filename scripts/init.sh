if [ -d "input" ]; then
    # dictory input is exsit
    echo "input is exsit"
else
    mkdir input
fi

if [ -d "input-video" ]; then
    # dictory input-video is exsit
    echo "input-video is exsit"
else
    mkdir input-video
fi

if [ -d "output" ]; then
    # dictory output is exsit
    echo "output is exsit"
else
    mkdir output
fi

if [ -d "output-video" ]; then
    # dictory output-video is exsit
    echo "output-video is exsit"
else
    mkdir output-video
fi