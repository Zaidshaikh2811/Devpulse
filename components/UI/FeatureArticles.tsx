import { Button } from '@heroui/button'
import React from 'react'
import CardComponent from './Card'

const FeatureArticles = () => {
    return (
        <div className='container my-14  '>
            <div className='flex justify-between text-center align-middle items-center mb-10'>

                <h1 className='text-2xl'>Feature Articles</h1>
                <Button color="primary" variant="ghost">
                    Read ALl Articles
                </Button>


            </div>
            <CardComponent />
        </div>
    )
}

export default FeatureArticles
