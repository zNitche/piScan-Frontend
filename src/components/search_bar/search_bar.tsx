import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import TextInput from "../design/text_input/text_input";
import classes from "./search_bar.module.css";
import Button from "../design/button/button";
import SearchIcon from "@/icons/search";

interface SearchBarProps {
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setSearchValue }: SearchBarProps) {
    const [query, setQuery] = useState("");

    return (
        <div className={classes.wrapper}>
            <TextInput
                fullWidth
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setQuery(event.target.value);
                }}
                placeholder="Filename"
                className={classes["search-input"]}
            />
            <Button
                className={classes["search-btn"]}
                onClick={() => {
                    setSearchValue(query);
                }}
            >
                <SearchIcon />
            </Button>
        </div>
    );
}
