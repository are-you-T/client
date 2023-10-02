import path from "path";

const cracoConfig: any = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
};

export default cracoConfig;
