export const ClassListAdd = ((elementRef: any, classAnimation: string) => {
    return elementRef.current.classList.add(classAnimation)
});

export const ClassListRemove = ((elementRef: any, classAnimation: string) => {
    return elementRef.current.classList.remove(classAnimation)
});
