import React from 'react'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import style from './DownshiftInput.module.css'
import ErrorLabel from 'components/ErrorLabel'
import FloatingLabel from './FloatingLabel'

const itemToString = item => (item ? item : '')

const DownshiftInput = ({ input, meta, placeholder, items, ...rest }) => (
    <div>
        <Downshift
            {...input}
            onInputValueChange={inputValue => input.onChange(inputValue)}
            itemToString={itemToString}
            selectedItem={input.value}
        >
            {({
                getInputProps,
                getItemProps: getDownshiftItemProps,
                getLabelProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                toggleMenu,
            }) => {
                const filteredItems = matchSorter(items, inputValue, {
                    keys: ['label'],
                    maxRanking: matchSorter.rankings.STARTS_WITH
                })

                const getItemProps = ({ value, index, ...props }) => {
                    const downshiftItemProps = {
                        key: value,
                        index,
                        item: value,
                        style: {
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === value ? 'bold' : 'normal'
                        },
                        ...props
                    }
                    return getDownshiftItemProps(downshiftItemProps)
                }
                const inputProps = getInputProps({ name: input.name, placeholder: isOpen ? '' : placeholder })
                const openMenu = () => !isOpen && toggleMenu()
                const isOpenWithItems = isOpen && !!filteredItems.length
                const isOpenAndNoResults = isOpen && !filteredItems.length
                const placeholderLastWord = placeholder.split(' ').pop()
                return (
                    <div
                        className="ui search downshift"
                        onClick={openMenu}
                    >
                        <FloatingLabel visible={isOpen || !!inputValue.length} label={placeholderLastWord} />
                        {meta.touched && meta.error && <ErrorLabel>{meta.error}</ErrorLabel>}
                        <input {...inputProps} style={isOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}} />
                        <div className={`results ${style.results}`} style={{ display: isOpen ? "block" : "none", overflowY: "auto", maxHeight: "15em" }}>
                            {isOpenWithItems &&
                                filteredItems.map(({ value, label }, index) => (
                                    <div {...getItemProps({ value, index, className: "result" })} >
                                        <div className="content">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            {isOpenAndNoResults &&
                                <div className="result">
                                    No results found
                            </div>
                            }
                        </div>
                    </div>
                )
            }}
        </Downshift>
    </div>
)

export default DownshiftInput
