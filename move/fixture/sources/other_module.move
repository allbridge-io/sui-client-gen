module fixture::other_module {
    struct StructFromOtherModule has store { }

    public fun new(): StructFromOtherModule {
        StructFromOtherModule {}
    }
}