import React from 'react'
import { SearchIcon } from '../icons';
import { Kbd } from '@heroui/kbd';
import { Input } from '@heroui/input';
import { Search } from 'lucide-react';
interface ArticleSearchProps {
    value: string;
    onChange: (value: string) => void;
}
const ArticleSearch: React.FC<ArticleSearchProps> = ({
    value, onChange
}) => {

    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Search className="hidden lg:inline-block"  >
                    K
                </Search>
            }
            labelPlacement="outside"
            type="text"
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search articles..."
        />
    );

    return (
        <div>
            {searchInput}
        </div>
    )
}

export default ArticleSearch
