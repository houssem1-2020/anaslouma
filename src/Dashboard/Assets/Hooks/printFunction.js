
const usePrintFunction = (frameId) => {

    document.getElementById(frameId).contentWindow.window.print();
};

export default usePrintFunction;