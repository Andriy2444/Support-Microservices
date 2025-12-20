import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserAuthModel = runtime.Types.Result.DefaultSelection<Prisma.$UserAuthPayload>;
export type AggregateUserAuth = {
    _count: UserAuthCountAggregateOutputType | null;
    _avg: UserAuthAvgAggregateOutputType | null;
    _sum: UserAuthSumAggregateOutputType | null;
    _min: UserAuthMinAggregateOutputType | null;
    _max: UserAuthMaxAggregateOutputType | null;
};
export type UserAuthAvgAggregateOutputType = {
    id: number | null;
};
export type UserAuthSumAggregateOutputType = {
    id: number | null;
};
export type UserAuthMinAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
};
export type UserAuthMaxAggregateOutputType = {
    id: number | null;
    email: string | null;
    password: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
};
export type UserAuthCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    role: number;
    createdAt: number;
    _all: number;
};
export type UserAuthAvgAggregateInputType = {
    id?: true;
};
export type UserAuthSumAggregateInputType = {
    id?: true;
};
export type UserAuthMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
};
export type UserAuthMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
};
export type UserAuthCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    role?: true;
    createdAt?: true;
    _all?: true;
};
export type UserAuthAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAuthWhereInput;
    orderBy?: Prisma.UserAuthOrderByWithRelationInput | Prisma.UserAuthOrderByWithRelationInput[];
    cursor?: Prisma.UserAuthWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserAuthCountAggregateInputType;
    _avg?: UserAuthAvgAggregateInputType;
    _sum?: UserAuthSumAggregateInputType;
    _min?: UserAuthMinAggregateInputType;
    _max?: UserAuthMaxAggregateInputType;
};
export type GetUserAuthAggregateType<T extends UserAuthAggregateArgs> = {
    [P in keyof T & keyof AggregateUserAuth]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserAuth[P]> : Prisma.GetScalarType<T[P], AggregateUserAuth[P]>;
};
export type UserAuthGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAuthWhereInput;
    orderBy?: Prisma.UserAuthOrderByWithAggregationInput | Prisma.UserAuthOrderByWithAggregationInput[];
    by: Prisma.UserAuthScalarFieldEnum[] | Prisma.UserAuthScalarFieldEnum;
    having?: Prisma.UserAuthScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserAuthCountAggregateInputType | true;
    _avg?: UserAuthAvgAggregateInputType;
    _sum?: UserAuthSumAggregateInputType;
    _min?: UserAuthMinAggregateInputType;
    _max?: UserAuthMaxAggregateInputType;
};
export type UserAuthGroupByOutputType = {
    id: number;
    email: string;
    password: string;
    role: $Enums.Role;
    createdAt: Date;
    _count: UserAuthCountAggregateOutputType | null;
    _avg: UserAuthAvgAggregateOutputType | null;
    _sum: UserAuthSumAggregateOutputType | null;
    _min: UserAuthMinAggregateOutputType | null;
    _max: UserAuthMaxAggregateOutputType | null;
};
type GetUserAuthGroupByPayload<T extends UserAuthGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserAuthGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserAuthGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserAuthGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserAuthGroupByOutputType[P]>;
}>>;
export type UserAuthWhereInput = {
    AND?: Prisma.UserAuthWhereInput | Prisma.UserAuthWhereInput[];
    OR?: Prisma.UserAuthWhereInput[];
    NOT?: Prisma.UserAuthWhereInput | Prisma.UserAuthWhereInput[];
    id?: Prisma.IntFilter<"UserAuth"> | number;
    email?: Prisma.StringFilter<"UserAuth"> | string;
    password?: Prisma.StringFilter<"UserAuth"> | string;
    role?: Prisma.EnumRoleFilter<"UserAuth"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"UserAuth"> | Date | string;
};
export type UserAuthOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAuthWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.UserAuthWhereInput | Prisma.UserAuthWhereInput[];
    OR?: Prisma.UserAuthWhereInput[];
    NOT?: Prisma.UserAuthWhereInput | Prisma.UserAuthWhereInput[];
    password?: Prisma.StringFilter<"UserAuth"> | string;
    role?: Prisma.EnumRoleFilter<"UserAuth"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"UserAuth"> | Date | string;
}, "id" | "email">;
export type UserAuthOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserAuthCountOrderByAggregateInput;
    _avg?: Prisma.UserAuthAvgOrderByAggregateInput;
    _max?: Prisma.UserAuthMaxOrderByAggregateInput;
    _min?: Prisma.UserAuthMinOrderByAggregateInput;
    _sum?: Prisma.UserAuthSumOrderByAggregateInput;
};
export type UserAuthScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserAuthScalarWhereWithAggregatesInput | Prisma.UserAuthScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserAuthScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserAuthScalarWhereWithAggregatesInput | Prisma.UserAuthScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"UserAuth"> | number;
    email?: Prisma.StringWithAggregatesFilter<"UserAuth"> | string;
    password?: Prisma.StringWithAggregatesFilter<"UserAuth"> | string;
    role?: Prisma.EnumRoleWithAggregatesFilter<"UserAuth"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserAuth"> | Date | string;
};
export type UserAuthCreateInput = {
    email: string;
    password: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
};
export type UserAuthUncheckedCreateInput = {
    id?: number;
    email: string;
    password: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
};
export type UserAuthUpdateInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAuthUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAuthCreateManyInput = {
    id?: number;
    email: string;
    password: string;
    role?: $Enums.Role;
    createdAt?: Date | string;
};
export type UserAuthUpdateManyMutationInput = {
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAuthUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAuthCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAuthAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserAuthMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAuthMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAuthSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserAuthSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["userAuth"]>;
export type UserAuthSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["userAuth"]>;
export type UserAuthSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["userAuth"]>;
export type UserAuthSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    createdAt?: boolean;
};
export type UserAuthOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["userAuth"]>;
export type $UserAuthPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserAuth";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        email: string;
        password: string;
        role: $Enums.Role;
        createdAt: Date;
    }, ExtArgs["result"]["userAuth"]>;
    composites: {};
};
export type UserAuthGetPayload<S extends boolean | null | undefined | UserAuthDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserAuthPayload, S>;
export type UserAuthCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserAuthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserAuthCountAggregateInputType | true;
};
export interface UserAuthDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserAuth'];
        meta: {
            name: 'UserAuth';
        };
    };
    findUnique<T extends UserAuthFindUniqueArgs>(args: Prisma.SelectSubset<T, UserAuthFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserAuthFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserAuthFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserAuthFindFirstArgs>(args?: Prisma.SelectSubset<T, UserAuthFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserAuthFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserAuthFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserAuthFindManyArgs>(args?: Prisma.SelectSubset<T, UserAuthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserAuthCreateArgs>(args: Prisma.SelectSubset<T, UserAuthCreateArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserAuthCreateManyArgs>(args?: Prisma.SelectSubset<T, UserAuthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserAuthCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserAuthCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserAuthDeleteArgs>(args: Prisma.SelectSubset<T, UserAuthDeleteArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserAuthUpdateArgs>(args: Prisma.SelectSubset<T, UserAuthUpdateArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserAuthDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserAuthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserAuthUpdateManyArgs>(args: Prisma.SelectSubset<T, UserAuthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserAuthUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserAuthUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserAuthUpsertArgs>(args: Prisma.SelectSubset<T, UserAuthUpsertArgs<ExtArgs>>): Prisma.Prisma__UserAuthClient<runtime.Types.Result.GetResult<Prisma.$UserAuthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserAuthCountArgs>(args?: Prisma.Subset<T, UserAuthCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserAuthCountAggregateOutputType> : number>;
    aggregate<T extends UserAuthAggregateArgs>(args: Prisma.Subset<T, UserAuthAggregateArgs>): Prisma.PrismaPromise<GetUserAuthAggregateType<T>>;
    groupBy<T extends UserAuthGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserAuthGroupByArgs['orderBy'];
    } : {
        orderBy?: UserAuthGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserAuthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAuthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserAuthFieldRefs;
}
export interface Prisma__UserAuthClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserAuthFieldRefs {
    readonly id: Prisma.FieldRef<"UserAuth", 'Int'>;
    readonly email: Prisma.FieldRef<"UserAuth", 'String'>;
    readonly password: Prisma.FieldRef<"UserAuth", 'String'>;
    readonly role: Prisma.FieldRef<"UserAuth", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"UserAuth", 'DateTime'>;
}
export type UserAuthFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where: Prisma.UserAuthWhereUniqueInput;
};
export type UserAuthFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where: Prisma.UserAuthWhereUniqueInput;
};
export type UserAuthFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where?: Prisma.UserAuthWhereInput;
    orderBy?: Prisma.UserAuthOrderByWithRelationInput | Prisma.UserAuthOrderByWithRelationInput[];
    cursor?: Prisma.UserAuthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAuthScalarFieldEnum | Prisma.UserAuthScalarFieldEnum[];
};
export type UserAuthFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where?: Prisma.UserAuthWhereInput;
    orderBy?: Prisma.UserAuthOrderByWithRelationInput | Prisma.UserAuthOrderByWithRelationInput[];
    cursor?: Prisma.UserAuthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAuthScalarFieldEnum | Prisma.UserAuthScalarFieldEnum[];
};
export type UserAuthFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where?: Prisma.UserAuthWhereInput;
    orderBy?: Prisma.UserAuthOrderByWithRelationInput | Prisma.UserAuthOrderByWithRelationInput[];
    cursor?: Prisma.UserAuthWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAuthScalarFieldEnum | Prisma.UserAuthScalarFieldEnum[];
};
export type UserAuthCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAuthCreateInput, Prisma.UserAuthUncheckedCreateInput>;
};
export type UserAuthCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserAuthCreateManyInput | Prisma.UserAuthCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserAuthCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    data: Prisma.UserAuthCreateManyInput | Prisma.UserAuthCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserAuthUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAuthUpdateInput, Prisma.UserAuthUncheckedUpdateInput>;
    where: Prisma.UserAuthWhereUniqueInput;
};
export type UserAuthUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserAuthUpdateManyMutationInput, Prisma.UserAuthUncheckedUpdateManyInput>;
    where?: Prisma.UserAuthWhereInput;
    limit?: number;
};
export type UserAuthUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAuthUpdateManyMutationInput, Prisma.UserAuthUncheckedUpdateManyInput>;
    where?: Prisma.UserAuthWhereInput;
    limit?: number;
};
export type UserAuthUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where: Prisma.UserAuthWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAuthCreateInput, Prisma.UserAuthUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserAuthUpdateInput, Prisma.UserAuthUncheckedUpdateInput>;
};
export type UserAuthDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
    where: Prisma.UserAuthWhereUniqueInput;
};
export type UserAuthDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAuthWhereInput;
    limit?: number;
};
export type UserAuthDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAuthSelect<ExtArgs> | null;
    omit?: Prisma.UserAuthOmit<ExtArgs> | null;
};
export {};
