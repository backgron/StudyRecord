import useLayoutEffectWithTarget from 'ahooks/es/utils/useLayoutEffectWithTarget';
import {
  animationFrameScheduler,
  concatAll,
  debounceTime,
  fromEvent,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { clamp } from 'lodash';
import { isMobile } from '@/common/utils';

export function useFreeDrag(target: any, enable = true) {
  useLayoutEffectWithTarget(
    () => {
      const dom = target.current as HTMLElement;
      if (!dom || !enable) return;
      // 保存元素原来的 style
      const style = dom.getAttribute('style') || '';
      // 按下事件
      const start$ = fromEvent<TouchEvent | MouseEvent>(
        dom,
        isMobile ? 'touchstart' : 'mousedown',
      ).pipe(
        map(ev => {
          const rect = dom.getBoundingClientRect();
          const isTouch = ev instanceof TouchEvent;
          // 点击位置相对于 dom 的偏移量
          return {
            dx: (isTouch ? ev.touches[0].pageX : ev.pageX) - rect.left,
            dy: (isTouch ? ev.touches[0].pageY : ev.pageY) - rect.top,
          };
        }),
      );
      // 移动事件
      const move$ = fromEvent<TouchEvent | MouseEvent>(
        document,
        isMobile ? 'touchmove' : 'mousemove',
        { passive: false },
      ).pipe(
        tap(e => e.preventDefault()),
        debounceTime(0, animationFrameScheduler),
      );
      // 松开事件
      const end$ = fromEvent<TouchEvent | MouseEvent>(document, isMobile ? 'touchend' : 'mouseup');
      const sub = start$
        .pipe(
          map(() => move$.pipe(takeUntil(end$))),
          concatAll(),
          withLatestFrom(start$, (move, { dx, dy }) => {
            const isTouch = move instanceof TouchEvent;
            return {
              x: clamp(
                (isTouch ? move.touches[0].clientX : move.clientX) - dx,
                0,
                innerWidth - dom.offsetWidth,
              ),
              y: clamp(
                (isTouch ? move.touches[0].clientY : move.clientY) - dy,
                0,
                innerHeight - dom.offsetHeight,
              ),
            };
          }),
        )
        .subscribe(pos => {
          dom.style.left = pos.x + 'px';
          dom.style.top = pos.y + 'px';
        });
      return () => {
        sub.unsubscribe();
        dom.setAttribute('style', style);
      };
    },
    [enable],
    target,
  );
}
