export const AddClass = (elementRef: any, classAnimation: string) => {
    return elementRef.current.classList.add(classAnimation);
};

export const RemoveClass = (elementRef: any, classAnimation: string) => {
    return elementRef.current.classList.remove(classAnimation);
};
