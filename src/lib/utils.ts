export class Utils {
    public static isUndefined(object: Object | undefined | unknown): boolean{
        return typeof object == 'undefined'
    }
}