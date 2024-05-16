export interface IMapper<Tin, Uout>{
    Map(from: Tin):Uout
}