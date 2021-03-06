import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  weeks: {
    type: String,
    required: [true, 'Please add a number of weeks']
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost']
  },
  minimunSkill: {
    type: String,
    required: [true, 'Please add a minimun skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
})

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const [obj] = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
      $group: { _id: '$bootcamp', averageCost: { $avg: '$tuition' } }
    }
  ])

  try {
    await this.model('Bootcamp').findByIdAndUpdate(this.bootcamp, {
      averageCost: Math.ceil(obj.averageCost / 10) * 10
    })
  } catch (error) {
    console.error(error)
  }
}

CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

export default mongoose.model('Course', CourseSchema)
