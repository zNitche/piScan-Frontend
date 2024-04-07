import Content from "./content";
import SelectedFileProvider from "@/context/selected_file_provider";

export default function Home() {
    return (
        <SelectedFileProvider>
            <Content />
        </SelectedFileProvider>
    );
}
