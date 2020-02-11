import React from "react";

const setElementSquareSizeAndCenter = (element, size) => {
  element.style.top = '50%';
  element.style.left = '50%';
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.marginLeft = `${-size / 2}px`;
  element.style.marginTop = `${-size / 2}px`;
}

const Ripple = React.forwardRef(({as, ...props}) => {
  const Component = as || 'div';

  const rippleConfig = {};
  const ref = React.createRef();
  let isTouching = false;

  const createRipple = (releaseEventName, releaseCallback, pageX, pageY) => {
    if (ref.current.hasAttribute('disabled') ||
      ref.current.classList.contains('disabled')) {
      return;
    }

    let release;

    const cancelRippleIfNecessary = () => {

      ref.current.removeEventListener("touchmove", cancelRippleIfNecessary);
      window.removeEventListener(releaseEventName, cancelRippleIfNecessary);

      if (release) {
        release();
      }
    };

    ref.current.addEventListener("touchmove", cancelRippleIfNecessary);
    window.addEventListener(releaseEventName, cancelRippleIfNecessary);

    const rippleWrapper = document.createElement('DIV');
    rippleWrapper.classList.add('u-ripple-wrapper');

    const ripple = document.createElement('DIV');
    ripple.classList.add('u-ripple');
    rippleWrapper.appendChild(ripple);
    ref.current.insertAdjacentElement('afterbegin', rippleWrapper);

    if (rippleConfig.size) {
      setElementSquareSizeAndCenter(rippleWrapper, rippleConfig.size);
    }

    if (rippleConfig.borderRadius) {
      rippleWrapper.style.borderRadius = rippleConfig.borderRadius;
    }

    release = () => {
      ripple.classList.add('dismiss');

      if (releaseCallback) {
        releaseCallback();
      }
    };

    ref.current.addEventListener('dragover', release);
    ref.current.addEventListener('mouseleave', release);

    ripple.addEventListener('transitionend', () => {
      if (ripple.classList.contains('dismiss')) {
        ref.current.removeChild(rippleWrapper);
        ref.current.removeEventListener('dragover', release);
        ref.current.removeEventListener('mouseleave', release);
      }
    });

    requestAnimationFrame(() => {
      const clientRect = ref.current.getBoundingClientRect();
      const largestDimensionSize = Math.max(rippleWrapper.clientWidth, rippleWrapper.clientHeight);
      const rippleSize = rippleConfig.size || largestDimensionSize * 2;
      setElementSquareSizeAndCenter(ripple, rippleSize);
      ripple.style.transitionDuration = `${1080 * Math.pow(rippleSize, 0.3)}ms, 750ms`;

      const x = (pageX - clientRect.left) + ((rippleSize - ref.current.clientWidth) / 2);
      const y = (pageY - clientRect.top) + ((rippleSize - ref.current.clientHeight) / 2);

      ripple.style.transformOrigin = `${x}px ${y}px`;
      ripple.classList.add('show');
    });
  }

  const mouseDown = (e) => {
    if (!isTouching) {
      createRipple('mouseup', null, e.clientX, e.clientY);
    }
  }

  const touchstart = (e) => {
    isTouching = true;
    createRipple('touchend', () => {
      setTimeout(() => {
        isTouching = false;
      }, 100);
    }, e.touches[0].clientX, e.touches[0].clientY);
  }

  return <Component ref={ref} {...props} onMouseDown={mouseDown} onTouchStart={touchstart} />;
});

export default Ripple;
