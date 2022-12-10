import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Home from '../components/Home'
import Layout from '../components/layout/Layout'
import axios from 'axios'

export default function Index({ data }) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {

  const jobType = query.jobType || ''
  const education = query.education || ''
  const experience = query.experience || ''
  const salary = query.salary || ''
  const keyword = query.keyword || ''
  const location = query.location || ''
  const page = query.page || 1

  let min = '';
  let max = '';
  if (query.salary) {
    [min, max] = query.salary.split('-');
  }

  const queryStr = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min}&max_salary=${max}`
  const res = await axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`)
  const data = res.data
  return {
    "props": {
      data
    }
  }
}