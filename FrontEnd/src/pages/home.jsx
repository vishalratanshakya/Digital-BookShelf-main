import React from "react"
import Hero from "../components/Home/Hero"
import RecentlyAdded from "../components/Home/RecentlyAdded"
import CategoryDummy from "../components/Home/CategoryDummy"

const Home = () => {  
	return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white px-10 py-8 ">
      <Hero />
      <RecentlyAdded />
      <CategoryDummy />
    </div>
  )
}

export default Home
