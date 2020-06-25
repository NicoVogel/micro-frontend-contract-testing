/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
}
        /******/
};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/
};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
        /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
    /******/
})
/************************************************************************/
/******/({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function (module, exports) {

            var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
                function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            };
            document.addEventListener("DOMContentLoaded", () => {
                const getAllElements = () => document.body.getElementsByTagName("*");
                const getUniqueCustomElements = (elements) => new Set([]
                    .map.call(elements, (el) => el.nodeName.toLowerCase())
                    // '-' is a naming requirement to identify custom elements
                    .filter((name) => name.includes("-")));
                const getAllUndefinedCustomElements = () => __awaiter(this, void 0, void 0, function* () {
                    const uniqueElements = getUniqueCustomElements(getAllElements());
                    const definedElements = [];
                    uniqueElements.forEach((value) => {
                        customElements.whenDefined(value)
                            .then(() => {
                                // this is a micro task which is executed after the current task 
                                definedElements.push(value);
                            });
                    });
                    return new Promise((resolve) => {
                        // this queues another micro task which is executed after 
                        // all the previously defined micro tasks
                        queueMicrotask(() => {
                            resolve(Array.from(uniqueElements)
                                .filter((value) => !definedElements.includes(value)));
                        });
                    });
                });
                const copyAttributes = (element, structures) => {
                    // getAttributeNames can contain duplicates
                    const structure = {};
                    Array.from(new Set(element.getAttributeNames()))
                        .forEach((name) => {
                            structure[name] = element.getAttribute(name);
                        });
                    structures.push(structure);
                };
                const observeAnyAttributeChange = (Element, attributeChanges) => {
                    // origin: https://github.com/w3c/webcomponents/issues/565#issuecomment-345556883
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === "attributes") {
                                const newVal = mutation.target
                                    .getAttribute(mutation.attributeName);
                                attributeChanges.push({
                                    attributeName: mutation.attributeName, newValue: newVal
                                });
                            }
                        });
                    });
                    observer.observe(Element, { attributes: true });
                };
                const getStructureOfUndefinedCustomElements = () => __awaiter(this, void 0, void 0, function* () {
                    const undefinedCustomElements = yield getAllUndefinedCustomElements();
                    const elementsStructure = {};
                    undefinedCustomElements.forEach((element) => {
                        const currentElement = elementsStructure[element] =
                        {
                            structures: [],
                            attributeChanges: [],
                            eventListeners: new Set()
                        };
                        customElements.define(element, class extends HTMLElement {
                            constructor() {
                                super();
                            }
                            connectedCallback() {
                                copyAttributes(this, currentElement.structures);
                                const attributeChangesOfCurrentElement = [];
                                currentElement.attributeChanges.push(attributeChangesOfCurrentElement);
                                observeAnyAttributeChange(this, attributeChangesOfCurrentElement);
                            }
                            addEventListener(type, listener, options) {
                                console.log(`add event listener for ${type}`);
                                super.addEventListener(type, listener, options);
                                currentElement.eventListeners.add(type);
                            }
                        });
                    });
                    return elementsStructure;
                });
                (() => __awaiter(this, void 0, void 0, function* () {
                    const val = "recording";
                    window[val] = yield getStructureOfUndefinedCustomElements();
                    console.log(window[val]);
                }))();
            });


            /***/
})

    /******/
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRWpELE1BQU0sY0FBYyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckUsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLFFBQW1DLEVBQUUsRUFBRSxDQUN0RSxJQUFJLEdBQUcsQ0FBUyxFQUFFO1NBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENB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QWdCLEVBQUUsRUFBRTtvQkFDcEIsY0FBYyxFQUFFLElBQUksR0FBRyxFQUFVO2lCQUNsQyxDQUFDO1lBRUYsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBTSxTQUFRLFdBQVc7Z0JBQ3REO29CQUNFLEtBQUssRUFBRSxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsaUJBQWlCO29CQUNmLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNoRCxNQUFNLGdDQUFnQyxHQUFzQixFQUFFLENBQUM7b0JBQy9ELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUM7b0JBQ3RFLHlCQUF5QixDQUFDLElBQUksRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO2dCQUNELGdCQUFnQixDQUNkLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTztvQkFFdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDakMsS0FBSyxDQUFDLGdCQUFnQixDQUNwQixJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FDeEIsQ0FBQztvQkFDRixjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsQ0FBQzthQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUdELENBQUMsR0FBUyxFQUFFO1FBQ1YsTUFBTSxHQUFHLEdBQUcsV0FBVztRQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxxQ0FBcUMsRUFBRSxDQUFDO1FBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsRUFBQyxFQUFFO0FBQ04sQ0FBQyxDQUFDIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cbiAgY29uc3QgZ2V0QWxsRWxlbWVudHMgPSAoKSA9PiBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcbiAgY29uc3QgZ2V0VW5pcXVlQ3VzdG9tRWxlbWVudHMgPSAoZWxlbWVudHM6IEhUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD4pID0+XG4gICAgbmV3IFNldDxzdHJpbmc+KFtdXG4gICAgICAubWFwLmNhbGwoZWxlbWVudHMsIChlbDogRWxlbWVudCkgPT4gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgIC8vICctJyBpcyBhIG5hbWluZyByZXF1aXJlbWVudCB0byBpZGVudGlmeSBjdXN0b20gZWxlbWVudHNcbiAgICAgIC5maWx0ZXIoKG5hbWU6IHN0cmluZykgPT4gbmFtZS5pbmNsdWRlcyhcIi1cIikpKTtcblxuICBjb25zdCBnZXRBbGxVbmRlZmluZWRDdXN0b21FbGVtZW50cyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB1bmlxdWVFbGVtZW50cyA9IGdldFVuaXF1ZUN1c3RvbUVsZW1lbnRzKGdldEFsbEVsZW1lbnRzKCkpO1xuICAgIGNvbnN0IGRlZmluZWRFbGVtZW50cyA9IFtdO1xuICAgIHVuaXF1ZUVsZW1lbnRzLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICBjdXN0b21FbGVtZW50cy53aGVuRGVmaW5lZCh2YWx1ZSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIC8vIHRoaXMgaXMgYSBtaWNybyB0YXNrIHdoaWNoIGlzIGV4ZWN1dGVkIGFmdGVyIHRoZSBjdXJyZW50IHRhc2sgXG4gICAgICAgICAgZGVmaW5lZEVsZW1lbnRzLnB1c2godmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9KVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmdbXT4oKHJlc29sdmUpID0+IHtcbiAgICAgIC8vIHRoaXMgcXVldWVzIGFub3RoZXIgbWljcm8gdGFzayB3aGljaCBpcyBleGVjdXRlZCBhZnRlciBcbiAgICAgIC8vIGFsbCB0aGUgcHJldmlvdXNseSBkZWZpbmVkIG1pY3JvIHRhc2tzXG4gICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoQXJyYXkuZnJvbSh1bmlxdWVFbGVtZW50cylcbiAgICAgICAgICAuZmlsdGVyKCh2YWx1ZSkgPT4gIWRlZmluZWRFbGVtZW50cy5pbmNsdWRlcyh2YWx1ZSkpKVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpbnRlcmZhY2UgQXR0cmlidXRlU3RydWN0dXJlIHtcbiAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nO1xuICB9XG4gIGludGVyZmFjZSBBdHRyaWJ1dGVDaGFuZ2Uge1xuICAgIGF0dHJpYnV0ZU5hbWU6IHN0cmluZztcbiAgICBuZXdWYWx1ZTogc3RyaW5nO1xuICB9XG4gIGludGVyZmFjZSBDdXN0b21FbGVtZW50c1JlY29yZGluZ3Mge1xuICAgIFtuYW1lOiBzdHJpbmddOiB7XG4gICAgICBzdHJ1Y3R1cmVzOiBBdHRyaWJ1dGVTdHJ1Y3R1cmVbXTtcbiAgICAgIGF0dHJpYnV0ZUNoYW5nZXM6IEF0dHJpYnV0ZUNoYW5nZVtdW107XG4gICAgICBldmVudExpc3RlbmVyczogU2V0PHN0cmluZz47XG4gICAgfTtcbiAgfVxuXG5cbiAgY29uc3QgY29weUF0dHJpYnV0ZXMgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgc3RydWN0dXJlczogQXR0cmlidXRlU3RydWN0dXJlW10pID0+IHtcblxuICAgIC8vIGdldEF0dHJpYnV0ZU5hbWVzIGNhbiBjb250YWluIGR1cGxpY2F0ZXNcbiAgICBjb25zdCBzdHJ1Y3R1cmUgPSB7fTtcbiAgICBBcnJheS5mcm9tKG5ldyBTZXQ8c3RyaW5nPihlbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCkpKVxuICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgc3RydWN0dXJlW25hbWVdID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICB9KTtcbiAgICBzdHJ1Y3R1cmVzLnB1c2goc3RydWN0dXJlKTtcbiAgfVxuXG4gIGNvbnN0IG9ic2VydmVBbnlBdHRyaWJ1dGVDaGFuZ2UgPSAoRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgYXR0cmlidXRlQ2hhbmdlczogQXR0cmlidXRlQ2hhbmdlW10pID0+IHtcblxuICAgIC8vIG9yaWdpbjogaHR0cHM6Ly9naXRodWIuY29tL3czYy93ZWJjb21wb25lbnRzL2lzc3Vlcy81NjUjaXNzdWVjb21tZW50LTM0NTU1Njg4M1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgbXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICAgIGNvbnN0IG5ld1ZhbCA9IChtdXRhdGlvbi50YXJnZXQgYXMgSFRNTEVsZW1lbnQpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgIGF0dHJpYnV0ZUNoYW5nZXMucHVzaCh7XG4gICAgICAgICAgICBhdHRyaWJ1dGVOYW1lOiBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lLCBuZXdWYWx1ZTogbmV3VmFsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShFbGVtZW50LCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdCBnZXRTdHJ1Y3R1cmVPZlVuZGVmaW5lZEN1c3RvbUVsZW1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHVuZGVmaW5lZEN1c3RvbUVsZW1lbnRzID0gYXdhaXQgZ2V0QWxsVW5kZWZpbmVkQ3VzdG9tRWxlbWVudHMoKTtcbiAgICBjb25zdCBlbGVtZW50c1N0cnVjdHVyZTogQ3VzdG9tRWxlbWVudHNSZWNvcmRpbmdzID0ge307XG5cbiAgICB1bmRlZmluZWRDdXN0b21FbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50RWxlbWVudCA9IGVsZW1lbnRzU3RydWN0dXJlW2VsZW1lbnRdID1cbiAgICAgIHtcbiAgICAgICAgc3RydWN0dXJlczogW10sXG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZXM6IFtdLFxuICAgICAgICBldmVudExpc3RlbmVyczogbmV3IFNldDxzdHJpbmc+KClcbiAgICAgIH07XG5cbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShlbGVtZW50LCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICBjb3B5QXR0cmlidXRlcyh0aGlzLCBjdXJyZW50RWxlbWVudC5zdHJ1Y3R1cmVzKTtcbiAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVDaGFuZ2VzT2ZDdXJyZW50RWxlbWVudDogQXR0cmlidXRlQ2hhbmdlW10gPSBbXTtcbiAgICAgICAgICBjdXJyZW50RWxlbWVudC5hdHRyaWJ1dGVDaGFuZ2VzLnB1c2goYXR0cmlidXRlQ2hhbmdlc09mQ3VycmVudEVsZW1lbnQpXG4gICAgICAgICAgb2JzZXJ2ZUFueUF0dHJpYnV0ZUNoYW5nZSh0aGlzLCBhdHRyaWJ1dGVDaGFuZ2VzT2ZDdXJyZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uc1xuICAgICAgICApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZCBldmVudCBsaXN0ZW5lclwiKVxuICAgICAgICAgIHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICB0eXBlLCBsaXN0ZW5lciwgb3B0aW9uc1xuICAgICAgICAgICk7XG4gICAgICAgICAgY3VycmVudEVsZW1lbnQuZXZlbnRMaXN0ZW5lcnMuYWRkKHR5cGUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pO1xuICAgIHJldHVybiBlbGVtZW50c1N0cnVjdHVyZTtcbiAgfVxuXG5cbiAgKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB2YWwgPSBcInJlY29yZGluZ1wiXG4gICAgd2luZG93W3ZhbF0gPSBhd2FpdCBnZXRTdHJ1Y3R1cmVPZlVuZGVmaW5lZEN1c3RvbUVsZW1lbnRzKCk7XG4gICAgY29uc29sZS5sb2cod2luZG93W3ZhbF0pXG4gIH0pKClcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==