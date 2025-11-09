export const sponsor = {
    data: [""], // 确保始终是数组，避免map调用失败(fix)
    month: 0,
    updated: false,
    get title() {
        return this.month+"月"+"赞助者";
    },
    getRawData: async () => {
        try {
            var res=await fetch("https://api.vilinko.com/sponsors/monthly");
            if (!res.ok) {
                console.log("Error: " + res.statusText);
                return null;
            }
            return res.json();
        } catch (error) {
            console.log("Error: " + error);
            return null;
        }
    },
    //如果已经更新成功过了，那么再执行就不会更新，返回值为true,可以通过 ignore_updated 参数强制更新
    update: async function (ignore_updated = false): Promise<boolean> {
        if(this.updated && !ignore_updated) {
            return true;
        }
        var res = await this.getRawData();
        if (res != null && res.code == 200) {
            this.data = res.data.sponsors || []; // 确保即使sponsors字段为空也返回数组
            this.month = res.data.month;
            this.updated = true;
            return true;
        }
        // 即使获取数据失败，也要确保data是数组
        this.data = this.data || [];
        return false;
            
        },
    get names() {
        return this.data;
    }
};
