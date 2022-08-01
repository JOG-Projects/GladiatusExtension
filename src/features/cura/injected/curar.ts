import { doWork } from "../../utils";

doWork("curar", async () => {

});

function eventMaker(elem: HTMLElement, eventName: string) {
    const event = document.createEvent('HTMLEvents');

    // Define that the event name is 'build'.
    event.initEvent(eventName, false, false);

    // target can be any Element or other EventTarget.
    elem.dispatchEvent(event);
}

function drag(elem: HTMLElement) {
    eventMaker(elem, 'dragover');
    eventMaker(elem, 'drop');
    eventMaker(elem, 'dragend');
}