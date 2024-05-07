import Image from 'next/image';
// import StarBorderIcon from '@mui/icons-material/StarBorder';




export default function GridPostList({posts}:any) {

    console.log(posts)

  return (
    <>

    {posts.map((item:any,index:any) => (
        <div key={index} className='grid lg:grid-cols-3 gap-0 items-center justify-center w-full'>
            <div>
        <Image src={item?.imageUrl} alt={item?.caption} height={240} width={320} style={{objectFit:"cover",borderRadius:"10px"}}/>
        </div>
       </div>
    ))}
  
    {/* {posts.map((post:any , index:any) => (
        <div key={index}>
            <Image src={post?.imageUrl} alt={post?.caption} height={400} width={500}/>
        </div>)
     } */}
   </>
  );
}

