import React from "react";

/**
 * @desc Give you a range of numbers from F up to and not including T
 */
declare type NumRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * @desc Pick all keys from object or string union `T` that start with `Pattern`
 */
declare type PickStartsWith<T, Pattern extends string> = T extends object
  ? {
      [K in keyof T as K extends `${Pattern}${string}` ? K : never]: T[K];
    }
  : T extends `${Pattern}${string}`
  ? T
  : never;

/**
 * @desc Pick all keys from object or string union `T` that end with `Pattern`
 */
declare type PickEndsWith<T, Pattern extends string> = T extends object
  ? {
      [K in keyof T as K extends `${string}${Pattern}` ? K : never]: T[K];
    }
  : T extends `${string}${Pattern}`
  ? T
  : never;

/**
 * @desc Pick all keys from object or string union `T` that contain `Pattern`
 */
declare type PickIncludes<T, Pattern extends string> = T extends object
  ? {
      [K in keyof T as K extends `${string}${Pattern}${string}`
        ? K
        : never]: T[K];
    }
  : T extends `${string}${Pattern}${string}`
  ? T
  : never;

/**
 * @desc Opposite of `NonNullable`
 */
declare type Nullable<T> = T | null;

/**
 * @desc Make all keys and sub-keys of all objects in `T` nullable
 */
declare type DeepNullable<T extends object> = Nullable<{
  [K in keyof T]: T[K] extends object
    ? Nullable<DeepNullable<T[K]>>
    : Nullable<T[K]>;
}>;

/**
 * @desc Make all keys and sub-keys of all objects in `T` partial/optional
 */
declare type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * @desc Make all keys and sub-keys of all objects in `T` required
 */
declare type DeepRequired<T extends object> = Required<{
  [K in keyof T]: T[K] extends object ? DeepRequired<T[K]> : Required<T[K]>;
}>;

/**
 * @desc Used to get the type of functional or class components if their props types
 * aren't available.
 */
declare type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
  ? Props
  : never;
