var Movie=require('../models/movie')

//detail page
exports.detail=function(req,res){
    var id=req.params.id
    Movie.findById(id,function(err,movie){
        res.render('detail',{
            title:'imooc 详情页',
            movie:movie
        })
    })
    
}

//admin page
exports.new = function(req,res){
    res.render('admin',{
        title:'imooc 后台录入页',
        movie:{
            title:"",
            doctor:"",
            country:"",
            poster:"",
            flash:"",
            language:"",
            year:"",
            summary:""
        }
    })
}

//admin post movie
exports.save = function(req,res){
    var id=req.body.movie._id
    var movieObj=req.body.movie
    var _movie
if(id!=='undefined'){
    Movie.findById(id,function(err,movie){
        if(err){
            console.log(err)
        }

        _movie=_.extend(movie,movieObj)
        _movie.save(function(err,movie){
            if(err){
                console.log(err)
            }

            res.redirect('/movie/',+movie._id)
        })
    })
}
else{
    _movie=new Movie({
        doctor:movieObj.doctor,
        title:movieObj.title,
        country:movieObj.country,
        language:movieObj.language,
        year:movieObj.year,
        poster:movieObj.poster,
        summary:movieObj.summary,
        flash:movieObj.flash,
    })
    _movie.save(function(err,movie){
        if(err){
            console.log(err)
        }

        res.redirect('/movie/',+movie._id)
    })
}

}


//admin update movie
exports.update =function(req,res){
    var id=req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'imooc 后台更新页',
                movie:movie
            })
        })
    }
}

//list page
exports.list = function(req,res){
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title:'imooc 列表页',
            movies:movies
        })
    })
}

//删除列表
exports.del = function(req, res){
    var id = req.query.id;
    if(id) {
        Movie.remove({_id: id},function (err,movie) {
            if(err){
                console.log(err);
            }
            res.json({success: 1});
        });
    }

}

