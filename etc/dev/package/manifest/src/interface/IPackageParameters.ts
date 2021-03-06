import {
    PartialDeep,
    Primitive
} from 'type-fest'

import {
    PackageJson
} from '../schema'

export type RequiredDeep<Type> = Type extends Primitive
    ? Required<Type>
    : Type extends object
        ? {
            [Key in keyof Type]-?: RequiredDeep<Type[Key]>
        }
        : Type

export interface ICastToString {

}

export interface IPerson {
    name: string,
    email?: string,
    url?: string
}

export interface IBugsContact {
    email: string,
    url?: string
}

export interface Organization {
    email: string,
    legalName?: string,
    shortName: string
}

export interface IContributor extends IPerson {}

export interface IPackageParameters {
    company: ICompany,
    contributors: ,
    keywords: [Keywords],
    name: string,
    support: IBugsContact,
    version: ISemVer
}

export interface IPackageOptions extends PartialDeep<IPackageParameters> {}

export interface IPackageConfig extends RequiredDeep<IPackageParameters> {}